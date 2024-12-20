import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Tabs,
  Tab,
  Textarea,
} from "@nextui-org/react";
import { axiosAdmin } from "../../../../../service/AxiosAdmin";
import CustomUpload from "../../CustomUpload/CustomUpload";

function ModalAddChapter({
  isOpen,
  onOpenChange,
  onSubmit,
  editData,
  setEditData,
  subjectCode,
  lastChapterNumber
}) {
  const [fileList, setFileList] = useState([]);
  const [activeTab, setActiveTab] = useState('Form'); // Trạng thái để theo dõi tab hiện tại

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  useEffect(() => {
    console.log(lastChapterNumber)
    console.log(subjectCode)
    if (subjectCode) {
      setEditData((prev) => ({
        ...prev,
        chapterName: `${subjectCode}_C0${isNaN(lastChapterNumber) ? 1 : lastChapterNumber + 1}`,
      }));
    }
  }, [subjectCode, lastChapterNumber]);

  return (
    <Modal
      className="max-w-lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-[#FF9908]">Tạo chương mới</ModalHeader>
            <ModalBody>

                  <div className="flex flex-col h-full">
                    <form
                      className="flex flex-col gap-3 h-full"
                      onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(editData);
                        onClose();
                      }}
                    >
                      <Input
                        fullWidth
                        label="Tên chương"
                        name="chapterName"
                        value={editData.chapterName || ''}
                        onChange={handleChange}
                        required
                        disabled = 'true'
                      />
                      <Textarea
                        fullWidth
                        label="Mô tả"
                        name="description"
                        placeholder="Nhập mô tả"
                        value={editData.description || ''}
                        onChange={handleChange}
                        rows={4}
                        minRows={4}
                        maxRows={6}
                      />
                    </form>
                  </div>

            </ModalBody>
            <ModalFooter>
              <Button variant="light" onClick={onClose}>
                Hủy
              </Button>
              {activeTab !== 'Excel' && (
                <Button
                  type="submit"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit(editData);
                    onClose();
                  }}
                >
                  Tạo mới
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalAddChapter;
