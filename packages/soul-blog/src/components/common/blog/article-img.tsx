import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { forwardRef, useEffect } from "react";
import { ImageUp, X, MessagesSquare } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
type ArticleImgProps = {
  value: string;
  onValueChange?: (value: string) => void;
};

type FileUploadProps = {
  multiple?: boolean;
  accept?: string;
  onValueChange?: (status: FileUploadStatus) => void;
};

type FileUploadStatus = {
  isUploading: boolean;
  uploadSuccess: boolean;
  fileUrl: string;
  message: string;
};
const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (props: FileUploadProps, ref) => {
    const [fileUploadStatus, setFileUploadStatus] = useState<FileUploadStatus>({
      isUploading: false,
      uploadSuccess: false,
      fileUrl: "",
      message: "",
    });
    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // fetch 上传
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("http://localhost:9990/file/upload", {
            method: "POST",
            body: formData,
          });
          if (res.ok) {
            const responseData = await res.json();
            const { success, message, data } = responseData;
            setFileUploadStatus({
              isUploading: true,
              uploadSuccess: success,
              message: message,
              fileUrl: data.url,
            });
          } else {
            console.log(res.status);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    const onRemoveUpload = () => {
      setFileUploadStatus({
        isUploading: false,
        uploadSuccess: false,
        fileUrl: "",
        message: "",
      });
    };
    useEffect(() => {
      props.onValueChange?.(fileUploadStatus);
    }, [fileUploadStatus]);
    return (
      <div className="flex gap-2">
        <Input
          id="file-upload"
          type="file"
          ref={ref}
          placeholder="选择封面图片"
          className=" hidden"
          onChange={onChange}
          {...props}
        />
        <Label
          htmlFor="file-upload"
          aria-label="上传图片"
          className="flex justify-center items-center w-20 h-20 border border-dashed border-gray-300 rounded-md bg-background cursor-pointer hover:bg-gray-50"
        >
          <ImageUp />
        </Label>
        <div className="ml-2 inline-flex gap-2">
          {fileUploadStatus.isUploading && fileUploadStatus.uploadSuccess && (
            <div className="w-20 h-20 border border-dashed border-gray-300 rounded-md relative">
              <div
                className="absolute top-0 right-0 z-1 cursor-pointer"
                onClick={onRemoveUpload}
              >
                <X size={14} />
              </div>
              <img
                src={fileUploadStatus.fileUrl}
                alt=""
                className="w-full h-full"
              />
            </div>
          )}
          {fileUploadStatus.isUploading && !fileUploadStatus.uploadSuccess && (
            <div className=" text-red-500 ">{fileUploadStatus.message}</div>
          )}
        </div>
      </div>
    );
  }
);

const AIArticleImage = () => {
  return <div>AI 配图</div>;
};

const AutoExtractArticleImage = () => {
  return (
    <Alert>
      <MessagesSquare className="h-4 w-4" />
      <AlertTitle>Tips</AlertTitle>
      <AlertDescription className="text-sm">
        自动从文章中抽取合适的图片作为文章封面，一般是文章的第一张图片
      </AlertDescription>
    </Alert>
  );
};
const ArticleImg = forwardRef<HTMLImageElement, ArticleImgProps>(
  ({ value, onValueChange }: ArticleImgProps, ref) => {
    const [articlePictureSetting, setArticlePictureSetting] = useState({
      type: 0,
      url: "",
    });
    const onUploadStatusChange = (status: FileUploadStatus) => {
      setArticlePictureSetting({
        ...articlePictureSetting,
        url: status.fileUrl,
      });
    };
    useEffect(() => {
      onValueChange?.(
        JSON.stringify({
          url: articlePictureSetting.url,
          type: articlePictureSetting.type,
        })
      );
    }, [articlePictureSetting]);
    return (
      <div className="flex flex-col gap-2">
        <div>
          <RadioGroup
            onValueChange={(value) => {
              setArticlePictureSetting({
                ...articlePictureSetting,
                type: parseInt(value),
              });
            }}
            defaultValue={articlePictureSetting.type.toString()}
            className="flex"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="singlePicture" />
              <Label htmlFor="singlePicture">单图</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="AIPicture" />
              <Label htmlFor="AIPicture">AI 配图</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="autoExtract" />
              <Label htmlFor="autoExtract">自动提取</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          {articlePictureSetting.type === 0 && (
            <FileUpload onValueChange={onUploadStatusChange} />
          )}
          {articlePictureSetting.type === 1 && <AIArticleImage />}
          {articlePictureSetting.type === 2 && <AutoExtractArticleImage />}
        </div>
      </div>
    );
  }
);
ArticleImg.displayName = "ArticleImg";
export default ArticleImg;
