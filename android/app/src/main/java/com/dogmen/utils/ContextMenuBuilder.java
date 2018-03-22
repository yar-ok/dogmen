package com.dogmen.utils;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Build;
import android.widget.ArrayAdapter;

import java.util.List;

public class ContextMenuBuilder {

    public static void showListDialog(final Context context, List<String> arrayList,
                                      String negativeString, final DialogInterface.OnClickListener clickNegative, final DialogInterface.OnClickListener clickItem) {
        if (context != null) {
            AlertDialog.Builder builderSingle;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                builderSingle = new AlertDialog.Builder(context, android.R.style.Theme_Material_Light_Dialog_Alert);
            } else {
                builderSingle = new AlertDialog.Builder(context);
            }
            builderSingle.setTitle(null);
            final ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(
                    context, android.R.layout.select_dialog_singlechoice);
            arrayAdapter.addAll(arrayList);
            builderSingle.setNegativeButton(negativeString == null ? "cancel" : negativeString,
                    new DialogInterface.OnClickListener() {

                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                            if (clickNegative != null) {
                                clickNegative.onClick(dialog, which);
                            }
                        }
                    });

            builderSingle.setAdapter(arrayAdapter,
                    new DialogInterface.OnClickListener() {

                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            if (clickItem != null) {
                                clickItem.onClick(dialog, which);
                            }
                        }
                    });
            AlertDialog alertDialog = builderSingle.create();
            alertDialog.show();
        }
    }
}
