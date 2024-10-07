import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form,Image, Upload } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadImg = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  //const [fileList, setFileList] = useState([]);
  // useEffect(() => {
  //   console.log(previewImage+' '+previewOpen);
  //   if(props.fileList.length === 0){
  //     setPreviewImage('');
  //     setPreviewOpen(false);
  //   }
  // },[props.fileList]);
  let arrImg = []
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  //const handleChange = ({ fileList: newFileList }) => {setFileList(newFileList); props.setFileList(newFileList[0])} ;
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const handleChange = (e) => {
        arrImg = props.fileList
        const checkL = arrImg.length
        if(checkL <= 0){
          arrImg.push(e)
        }else{
          Object.keys(arrImg).forEach(function(k) {
            if(arrImg[k].uid === e.uid){
              arrImg.splice(k, 1);
            }
          });
          if(checkL === arrImg.length){arrImg.push(e)}
        }
        //setFileList(arrImg)
        props.setFileList(arrImg)
    }
  return (
    <>
    <Form.Item
                            {...props.inputUpload.formItem}
                            rules={[
                                {
                                    required: !props.setNull ? true : false,
                                    message: 'Please upload img!',
                                }
                            ]}
                        >
      <Upload
        //action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        //fileList={props.fileList}
        beforeUpload={() => false}
        listType="picture-card"
        onPreview={handlePreview}
        onChange={(e) => {handleChange(e.file)}}
        {...props.inputUpload.upload}
        //maxCount={2}
      >
        {props.fileList.length > props.inputUpload.maxCount ? null : uploadButton}
      </Upload>
      </Form.Item>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
export default UploadImg;