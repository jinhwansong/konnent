import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import bcrypt from 'bcrypt';
import { fakerKO as faker } from '@faker-js/faker';
import { Users } from '../../entities/Users';
import { MentorProfile } from '../../entities/MentorProfile';
import { Mentors } from '../../entities/Mentors';
import {
  SocialLoginProvider,
  Status,
  UserRole,
} from '../../common/enum/status.enum';
import {
  MentoringPrograms,
  ProgramStatus,
} from '../../entities/MentoringPrograms';
import { AvailableSchedule } from '../../entities/AvailableSchedule';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // 랜덤데이터 만들때 사용
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const password = await bcrypt.hash('admin123!#', 12);
    const admin = await dataSource.getRepository(Users);
    // await admin.insert([
    //   {
    //     email: 'admin@naver.com',
    //     password: password,
    //     name: '관리자',
    //     nickname: '관리자',
    //     phone: '01012345678',
    //     role: UserRole.ADMIN,
    //     socialLoginProvider: SocialLoginProvider.LOCAL,
    //   },
    // ]);
    // 멘토
    const mentors = Array(50)
      .fill(null)
      .map((_) => {
        const randomNumber = Array(8)
          .fill(0)
          .map(() => Math.floor(Math.random() * 10))
          .join('');
        const uniqueId = faker.string.alphanumeric(8);
        return {
          email: `${uniqueId}@naver.com`,
          password: password,
          name: faker.person.fullName(),
          nickname: uniqueId,
          phone: `010${randomNumber}`,
          role: UserRole.MENTOR,
          socialLoginProvider: SocialLoginProvider.LOCAL,
          image: `https://picsum.photos/196/260?random=${uniqueId}`,
        };
      });
    const insertMentor = await dataSource.getRepository(Users).insert(mentors);
    const ids = insertMentor.identifiers.map((m) => m.id);
    // 멘토 신청 더미
    const mentorData = ids.map((id, i) => ({
      userId: id,
      career: '미들(4~8년)',
      status: Status.APPROVED,
      email: `${faker.string.alphanumeric(8)}@naver.com`,
      job: '홍보/CSR',
      introduce: `${faker.lorem.paragraph()}${i}`,
      portfolio: faker.internet.url(),
    }));
    await dataSource.getRepository(Mentors).insert(mentorData);
    // 멘토프로필 더미
    const koreaCompanies = [
      '삼성전자',
      'LG전자',
      'SK하이닉스',
      '네이버',
      '카카오',
      '현대자동차',
      '롯데그룹',
      '포스코',
      'GS그룹',
      'CJ그룹',
      '쿠팡',
      '배달의민족',
      '토스',
      '당근마켓',
      '라인',
    ];
    const mentorProfile = ids.map((id) => ({
      userId: id,
      company: faker.helpers.arrayElement(koreaCompanies),
      introduce: `<p>${faker.lorem.paragraph()}</p>`,
      image: `https://picsum.photos/196/260?random=${faker.string.alphanumeric(8)}`,
      position: faker.person.jobType(),
    }));
    const mentor = await dataSource
      .getRepository(MentorProfile)
      .insert(mentorProfile);
    // 프로그램 생성 하자
    const jobTitles = [
      '커리어 성장을 위한',
      '실무자가 알려주는',
      '현직자의',
      '실전',
      '직무 역량 강화',
      '성과 달성을 위한',
      '실무 노하우',
      '핵심 스킬',
      '현직 멘토가 알려주는',
      '실무 사례로 배우는',
      '기초부터 실무까지',
      '실전 프로젝트로 배우는',
      '현업에서 필요한',
      '실무 역량 완성',
      '직무별 역량 강화',
      '현직자 시점으로 보는',
      '업계 트렌드와',
      '실무자의 노하우',
      '취업 준비생을 위한',
      '신입사원이 알아야 할',
      '경력직을 위한',
      '업무 생산성 향상',
      '실무자의 인사이트',
      'A to Z',
      '현업 실무자의',
      '성공적인 커리어를 위한',
      '실무 역량 마스터',
      '현장에서 통하는',
      '직무 전문성 강화',
      '실무 경험으로 배우는',
    ];

    const suffixes = [
      '멘토링',
      '심화 과정',
      '기초 과정',
      '실무 과정',
      '완성 과정',
      '마스터 클래스',
      '실전 과정',
      '커리어 과정',
      '성장 프로그램',
      '역량 강화 과정',
    ];
    const joblist = [
      '인사/총무/노무',
      '마케팅/MD',
      '홍보/CSR',
      '영업/영업관리',
      '해외영업',
      '회계/재무/금융',
      '전략/기획',
      '유통/무역/구매',
      '공사/공기업',
      'IT개발/데이터',
      '서비스 기획/UI, UX',
      '디자인/예술',
      '미디어',
      '서비스',
      '연구/설계',
      '전문/특수',
      '교육/상담/컨설팅',
      '공무원/비영리',
      '생산/품질/제조',
      '기타 사무',
    ];
    const intros = [
      '<p>안녕하세요! ${job} 분야에서 미들(4~8년)의 경력을 가진 멘토입니다. ${specialties}에 대한 실무 경험을 공유하고 싶습니다.</p>',
      '<p>${career}동안 ${achievements}를 성과로 이루었습니다. 이러한 경험을 바탕으로 실질적인 도움을 드리고 싶습니다.</p>',
    ];

    const specialties = [
      '프로젝트 관리',
      '팀 리더십',
      '업무 프로세스 개선',
      '성과 관리',
      '전략 기획',
      '조직 문화',
      '변화 관리',
      '리스크 관리',
    ];

    const achievements = [
      '매출 150% 성장',
      '팀 규모 3배 확장',
      '주요 프로젝트 성공적 완수',
      '신규 시장 진출',
      '조직 문화 혁신',
      '업무 프로세스 개선',
    ];
    const job = faker.helpers.arrayElement(joblist);
    const specialtie = faker.helpers.arrayElement(specialties);
    const achievement = faker.helpers.arrayElement(achievements);
    const profileId = mentor.identifiers.map((m) => m.id);
    const program = profileId.map((item) => ({
      profileId: item,
      title: `${faker.helpers.arrayElement(jobTitles)} ${faker.helpers.arrayElement(suffixes)} `,
      price: 10000,
      duration: 60,
      status: ProgramStatus.ACTIVE,
      averageRating: Number((Math.random() * (5.0 - 4.0) + 4.0).toFixed(2)),
      totalRatings: Number(Math.random() * (50 - 10 + 1) + 10),
      mentoring_field: `${faker.helpers.arrayElement(joblist)}`,
      content: faker.helpers
        .arrayElement(intros)
        .replace('${job}', job)
        .replace('${specialties}', specialtie)
        .replace('${achievements}', achievement),
    }));
    const programs = await dataSource
      .getRepository(MentoringPrograms)
      .insert(program);
    // 이용 시간
    const days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    const schedules = {};
    days.forEach((day) => {
      if (Math.random() > 0.5) {
        const hour = Math.floor(Math.random() * (22 - 10 + 1)) + 10;
        const min = Math.floor(Math.random() * 60);
        const startTime = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        const endTime = (hour + 1) % 60;
        schedules[day] = [{ startTime, endTime }];
      } else {
        schedules[day] = [];
      }
    });
    const programId = programs.identifiers.map((m) => m.id);
    const schedule = programId.map((item) => ({
      programId: item,
      available_schedule: schedules,
    }));
    await dataSource.getRepository(AvailableSchedule).insert(schedule);
    // // 일반사용자 50명
    // const userFactory = factoryManager.get(Users);
    // await userFactory.saveMany(50);
  }
}
