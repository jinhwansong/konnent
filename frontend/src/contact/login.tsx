export const input = [
  {
    name: 'email',
    type: 'text',
    placeholder: '이메일을 입력해주세요.',
    label: '이메일',
    rules: {
      required: '이메일은 필수 입력입니다.',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '올바른 이메일 형식을 입력해주세요.',
      },
    },
  },
  {
    name: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요.',
    label: '비밀번호',
    rules: {
      required: '비밀번호는 필수 입력입니다.',
      pattern: {
        value:
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        message: '올바른 비밀번호 형식을 입력해주세요.',
      },
    },
  },
];
