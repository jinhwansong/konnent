'use client';
import React from 'react';
import Modal from '../common/Modal';

export default function ReserveModal({ articleId }: { articleId: string }) {
  return (
    <Modal link={`/mentors/${articleId}`}>
      <h4 className="mb-5 text-xl leading-[1.4] font-semibold tracking-[-0.3px] text-[var(--text-bold)]">
        멘토링 예약
      </h4>
    </Modal>
  );
}
