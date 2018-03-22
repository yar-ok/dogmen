package com.dogmen.modules;

import android.app.Activity;
import android.content.ComponentName;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ResolveInfo;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;

import com.dogmen.MainApplication;
import com.dogmen.R;
import com.dogmen.utils.ContextMenuBuilder;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.List;

public class ImagePickerModule extends ReactContextBaseJavaModule {
    private static final int PICK_IMAGE = 1;
    private static final int CAMERA_CAPTURE = 2;

    private Callback pickerSuccessCallback;
    private Callback pickerCancelCallback;


    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (pickerSuccessCallback != null) {
                if (resultCode == Activity.RESULT_CANCELED) {
                    pickerCancelCallback.invoke("ImagePicker was cancelled");
                } else if (resultCode == Activity.RESULT_OK) {
                    Uri uri = intent.getData();

                    if (uri == null) {
                        pickerCancelCallback.invoke("No image data found");
                    } else {
                        try {
                            String realPath = getRealPathFromURI(uri);
                            pickerSuccessCallback.invoke(realPath);
                        } catch (Exception e) {
                            pickerCancelCallback.invoke("Exception: No image data found");
                        }
                    }
                }
            }
        }
    };

    public ImagePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "ImagePickerModule";
    }

    @ReactMethod
    public void pickImage(ReadableMap config, Callback successCallback, Callback cancelCallback) {
        final Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            cancelCallback.invoke("Activity doesn't exist");
            return;
        }

        pickerSuccessCallback = successCallback;
        pickerCancelCallback = cancelCallback;

        try {
            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
            galleryIntent.setType("image/*");

            Intent camIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

            final List<Intent> intentsList = new ArrayList<>();
            List<String> dialogList = new ArrayList<>();

            List<ResolveInfo> listCam = currentActivity.getPackageManager().queryIntentActivities(camIntent, 0);
            for (ResolveInfo res : listCam) {
                final Intent finalIntent = new Intent(camIntent);
                finalIntent.setComponent(new ComponentName(res.activityInfo.packageName, res.activityInfo.name));
                intentsList.add(finalIntent);
                dialogList.add("Camera");
            }

            intentsList.add(galleryIntent);
            dialogList.add("Gallery");

            ContextMenuBuilder.showListDialog(currentActivity, dialogList, "Cancel", null, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    if (which == 0) {
                        currentActivity.startActivityForResult(intentsList.get(0), CAMERA_CAPTURE);
                    } else {
                        currentActivity.startActivityForResult(intentsList.get(1), PICK_IMAGE);
                    }
                }
            });

        } catch (Exception e) {
            cancelCallback.invoke(e);
        }
    }

    private String getRealPathFromURI(Uri contentURI) {
        String result;
        Cursor cursor = MainApplication.getApplication().getContentResolver().query(contentURI, null, null, null, null);
        if (cursor == null) { // Source is Dropbox or other similar local file path
            result = contentURI.getPath();
        } else {
            cursor.moveToFirst();
            int idx = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
            result = cursor.getString(idx);
            cursor.close();
        }
        return result;
    }
}
