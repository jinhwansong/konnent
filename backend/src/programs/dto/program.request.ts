import { IntersectionType, PickType } from '@nestjs/swagger';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';
import { MentorProfile } from 'src/entities/MentorProfile';
import { Mentors } from 'src/entities/Mentors';
import { Users } from 'src/entities/Users';

export class UserProgram extends IntersectionType(
  PickType(MentorProfile, ['company', 'position', 'image']),
  PickType(Users, ['name']),
  PickType(Mentors, ['career']),
  PickType(MentoringPrograms, [
    'title',
    'averageRating',
    'mentoring_field',
    'id',
  ]),
) {}
