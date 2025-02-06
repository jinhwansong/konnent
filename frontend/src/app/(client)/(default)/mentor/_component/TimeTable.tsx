'use client'
import React from 'react'
import { scheduleDays } from '@/app/(client)/config/schedule';
import Button from '@/app/_component/Button';
import { IAvailableSchedule } from '../program/[id]/page';
import RejectModal from '@/app/(client)/_component/RejectModal';
import { usePopupStore } from '@/store/usePopupStore';
import style from './timeTable.module.scss';
import { slotTime } from '@/util/slotTime';

interface ITimeTable {
  schedule: IAvailableSchedule;
  children: string;
  duration: number;
}

export default function TimeTable({ children, schedule, duration }: ITimeTable) {
  // 팝업 오픈
  const { popup3, onPopup3, closePop } = usePopupStore();
  
  return (
    <>
      <Button type="button" onClick={onPopup3} width="Big">
        {children}
      </Button>
      {popup3 && (
        <RejectModal closePop={closePop} title="정규 멘토링 일정">
          <ul className={style.table}>
            {scheduleDays.map((item) =>
              schedule[item.id]?.length ? (
                <li key={item.id}>
                  <em>{item.label}</em>
                  <div className={style.time}>
                    {schedule[item.id]?.map((time) =>
                      slotTime(time.startTime, time.endTime, duration).map(
                        (slot, i) => <span key={i}>{slot}</span>
                      )
                    )}
                    {schedule[item.id]?.map((time) =>
                      slotTime(time.startTime, time.endTime, duration).map(
                        (slot, i) => <span key={i}>{slot}</span>
                      )
                    )}
                  </div>
                </li>
              ) : (
                <li key={item.id}>
                  <em>{item.label}</em>
                  <p className={style.no_time}>
                    해당 요일에는 정규일정이 없습니다.
                  </p>
                </li>
              )
            )}
          </ul>
        </RejectModal>
      )}
    </>
  );
}
