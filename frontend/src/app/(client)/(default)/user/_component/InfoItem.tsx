import React from 'react';
import Input from '@/app/_component/Input';
import Button from '@/app/_component/Button';
import style from './infoItem.module.scss';

interface IPasswordField {
  label: string;
  data: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

interface IInfoItem {
  label: string;
  data: string;

  type?: string;
  error?: string;
  prevKey?: string | null;
  placeholder?: string;
  name?: string;
  checkPassword?: IPasswordField;
  newPassword?: IPasswordField;
  snsid?: string;

  onButton?: () => void;
  onCancel?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave?: () => void;
}

export default function InfoItem({
  prevKey,
  onButton,
  label,
  data,
  type,
  error,
  onChange,
  placeholder,
  onCancel,
  checkPassword,
  name,
  newPassword,
  snsid,

  onSave,
}: IInfoItem) {
  return (
    <div className={style.info_item}>
      <em
        className={prevKey === label ? style.item_on_title : style.item_title}
      >
        {label}
      </em>
      <div className={prevKey === label ? style.item_on : style.item_right}>
        {prevKey === label ? (
          <>
            <Input
              type={type as string}
              name={label}
              onChange={onChange}
              placeholder={placeholder}
              value={data}
            />
            <p className={style.error}>{error}</p>
            {label === '비밀번호' && (
              <>
                <Input
                  type={type as string}
                  name={newPassword?.label as string}
                  onChange={newPassword?.onChange}
                  placeholder={newPassword?.placeholder}
                  value={newPassword?.data}
                />
                <p className={style.error}>{newPassword?.error}</p>
                <Input
                  type={type as string}
                  name={checkPassword?.label as string}
                  onChange={checkPassword?.onChange}
                  placeholder={checkPassword?.placeholder}
                  value={checkPassword?.data}
                />
                <p className={style.error}>{checkPassword?.error}</p>
              </>
            )}
            <div className={style.button_wrap}>
              <Button type="button" onClick={onCancel} bg="none" width="Small">
                취소
              </Button>
              <Button type="button" onClick={onSave} width="Small">
                변경
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={style.item_text}>
              {snsid
                ? '소셜로그인은 비밀번호 변경을 할수 없습니다.'
                : label === '비밀번호'
                ? name
                : data}
            </p>
            {label !== '이메일' &&
              !snsid &&
              label !== '이름' &&
              (!prevKey || prevKey === label) && (
                <Button
                  type="button"
                  bg="border"
                  onClick={onButton}
                  width="Small"
                >
                  설정
                </Button>
              )}
          </>
        )}
      </div>
    </div>
  );
}
