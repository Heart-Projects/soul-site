import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerOverlay,
} from "@/components/ui/drawer";
import { SaveArticleParams } from "@/api/user-article";
import PublishForm, { PublishFormSchema } from "./publish-setting-form";
import { InputForm } from "./form-test";

export default function PublishSetting(props: {
  article?: SaveArticleParams;
  open?: boolean;
  onCancel?: (open: boolean) => void;
  onSubmitForm?: (p: PublishFormSchema) => void;
}) {
  return (
    <Drawer direction="right" open={props.open}>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="bg-white flex flex-col rounded-t-[10px] h-full w-[600px] mt-4 fixed bottom-0 right-0 overflow-y-scroll">
          <div className="px-4 pt-1 bg-white flex-1 h-full">
            <DrawerHeader>
              <DrawerTitle>文章发布</DrawerTitle>
              <DrawerDescription>请填写文章类别及设置信息.</DrawerDescription>
            </DrawerHeader>
            <div className="p-2 pb-0 w-full">
              <PublishForm
                onSubmitForm={props.onSubmitForm}
                article={props.article}
              >
                <DrawerFooter className="flex-row justify-end sticky bottom-0  bg-white w-full">
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => props.onCancel?.(false)}
                    >
                      取消发布
                    </Button>
                  </DrawerClose>
                  <Button type="submit">确认发布</Button>
                </DrawerFooter>
              </PublishForm>
              {/* <InputForm /> */}
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
