import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Button,
  Textarea,
} from "@nextui-org/react";
import { capitalize } from "../../Utils/capitalize";

function ModalUpdateSubject({ isOpen, onOpenChange, onSubmit, editRubric, setEditRubric, DataSubject }) {

  // Xử lý thay đổi các giá trị của các trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRubric((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi giá trị của Select
  const handleSelectChange = (e) => {
    const Value = e.target.value;
    setEditRubric((prev) => ({
      ...prev,
      typesubject: Value,
    }));
  };

  const DataTypeSubject = [
    { key: 'Đại cương', TypeSubject: 'Đại cương' },
    { key: 'Cơ sở ngành', TypeSubject: 'Cơ sở ngành' },
    { key: 'Chuyên ngành', TypeSubject: 'Chuyên ngành' },
    { key: 'Thực tập và Đồ án', TypeSubject: 'Thực tập và Đồ án' },
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size='3xl'
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
            <ModalHeader className='text-[#FF9908]'>Cập nhật HP</ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(editRubric, editRubric.subject_id);
                  onClose();
                }}>
                <Input
                  fullWidth
                  label="Tên HP"
                  name="subjectName"
                  value={editRubric.subjectName || ''}
                  onChange={handleChange}
                  required
                />
                <Input
                  fullWidth
                  label="Mã HP"
                  name="subjectCode"
                  value={editRubric.subjectCode || ''}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  fullWidth
                  label="Mô tả"
                  name="description"
                  placeholder="Enter your description"
                  value={editRubric.description || ''}
                  onChange={handleChange}
                  rows={4}
                  minRows={4}
                  maxRows={6}
                />
                <Input
                  fullWidth
                  label="STC"
                  name="numberCredits"
                  type="number"
                  value={editRubric.numberCredits || ''}
                  onChange={handleChange}
                  required
                />
                <Input
                  fullWidth
                  label="STC LT"
                  name="numberCreditsTheory"
                  type="number"
                  value={editRubric.numberCreditsTheory || ''}
                  onChange={handleChange}
                  required
                />
                <Input
                  fullWidth
                  label="STC TH"
                  name="numberCreditsPractice"
                  type="number"
                  value={editRubric.numberCreditsPractice || ''}
                  onChange={handleChange}
                  required
                />
                <Select
                  label="Loại HP"
                  name="typesubject"
                  defaultSelectedKeys={[editRubric.typesubject]}
                  value={editRubric?.typesubject}
                  onChange={handleSelectChange}
                  fullWidth
                >
                  {DataTypeSubject.map((type) => (
                    <SelectItem key={type.key} value={type.TypeSubject}>
                      {capitalize(type.TypeSubject)}
                    </SelectItem>
                  ))}
                </Select>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onClick={onClose}>
                Hủy
              </Button>
              <Button
                type="submit"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit(editRubric, editRubric.subject_id);
                  onClose();
                }}
              >
                Cập nhật
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalUpdateSubject;
