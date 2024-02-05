import { Button, Form, FormInstance, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { useState } from "react";

const ImageUpload = ({
  form,
  imageUrl,
  setImageUrl,
}: {
  form: FormInstance<any>;
  imageUrl: any;
  setImageUrl: any;
}) => {
  const [loading, setLoading] = useState(false);

  const resizeImage = (
    img: HTMLImageElement,
    maxWidth: number,
    maxHeight: number,
  ): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    let width = img.width;
    let height = img.height;

    if (width > maxWidth || height > maxHeight) {
      const aspectRatio = width / height;
      if (width > height) {
        width = maxWidth;
        height = maxWidth / aspectRatio;
      } else {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, width, height);

    return canvas;
  };

  const getBase64 = (
    img: RcFile,
    maxWidth: number,
    maxHeight: number,
    callback: (url: string) => void,
  ) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        const resizedCanvas = resizeImage(imgElement, maxWidth, maxHeight);
        const resizedDataUrl = resizedCanvas.toDataURL("image/jpeg", 1); // Adjust the quality (0.0 - 1.0) as needed
        callback(resizedDataUrl);
      };
      imgElement.src = event.target?.result as string;
    };
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must be smaller than 10MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    form.setFields([
      {
        name: "picture",
        errors: [],
      },
    ]);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in the real world.
      getBase64(info.file.originFileObj as RcFile, 800, 600, (url) => {
        // Set desired max width and height
        setLoading(false);
        setImageUrl(url);
      });
    }
    if (info.fileList.length === 0) {
      setImageUrl("");
    }
  };

  return (
    <Form.Item
      name={"picture"}
      className=" flex flex-col"
      rules={[
        {
          message: "Image for the preloved item is required",
          validator: async (_: any, value: any) => {
            console.log(imageUrl);
            if (imageUrl !== "") {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          },
        },
      ]}
    >
      <div className=" font-bold sm:mb-1 sm:text-lg">
        Upload Photo of Item to be donated
      </div>
      <Upload
        listType="picture-card"
        className="upload-list-inline"
        maxCount={1}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Button
          size="large"
          className=" h-full border-none"
          icon={<UploadOutlined />}
        >
          Upload
        </Button>
      </Upload>
    </Form.Item>
  );
};

export default ImageUpload;
