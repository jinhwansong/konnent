export const onEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "이메일 형식이 올바르지 않습니다.";
  }
  return "";
};

export const onPassword = (password:string) => {
    const passowrdRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if(!passowrdRegex.test(password)) {
        return "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.";
    }
    return "";
};

export const onPasswordCheack = (password: string, passwordCheack:string) => {
  if (password !== passwordCheack) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return "";
};

export const onName = (name: string) => {
  const nameRegex = /^[가-힣a-zA-Z]{2,7}$/;

  if (!nameRegex.test(name)) {
    return "2글자 이상 7글자 이하로 작성해주세요";
  }
  return "";
};
export const onPhone = (phone: string) => {
  const phoneRegex = /^010-?([0-9]{4})-?([0-9]{4})$/;

  if (!phoneRegex.test(phone)) {
    return "휴대폰 번호를 정확히 입력해주세요";
  }
  return "";
};