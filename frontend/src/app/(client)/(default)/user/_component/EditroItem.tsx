import React from 'react'
import Button from '@/app/_component/Button';
import Editor from '@/app/_component/Editor';
import HtmlContent from '@/app/_component/HtmlContent';
import style from './infoItem.module.scss';


interface IEditroItem {
  data: string;
  isEditing: boolean;
  handleEdit: () => void;
  handleSave: () => void;
  handleCancel: () => void;
  onIntroduce: (newContent: string) => void;
  introduce: string;
}
export default function EditroItem({
  data,
  isEditing,
  handleEdit,
  handleSave,
  handleCancel,
  onIntroduce,
  introduce,
}: IEditroItem) {
  return (
    <>
      <div className={style.info_item}>
        <em className={style.item_title}>자기소개</em>
        <div className={style.editor_text}>
          {isEditing ? (
            <>
              <Editor onIntroduce={onIntroduce} introduce={introduce || data} />
              <div className={style.button_wrap}>
                <Button
                  type="button"
                  onClick={handleCancel}
                  bg="none"
                  width="Small"
                >
                  취소
                </Button>
                <Button type="button" onClick={handleSave} width="Small">
                  변경
                </Button>
              </div>
            </>
          ) : (
            <p className={style.item_text}>
              <HtmlContent html={data} />
            </p>
          )}
        </div>
      </div>
      {!isEditing && (
        <div className={style.editor_button}>
          <Button type="button" bg="border" onClick={handleEdit} width="Small">
            설정
          </Button>
        </div>
      )}
    </>
  );
}
