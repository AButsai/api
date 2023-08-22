import { ApiProperty } from '@nestjs/swagger';

class ContactDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  svg: string;
}

class WorkDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createAt: string;

  @ApiProperty()
  updateAt: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  descriptionWork: string;

  @ApiProperty()
  descriptionWork_ua: string;

  @ApiProperty()
  technologies: string;
}

class EducationDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createAt: string;

  @ApiProperty()
  updateAt: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  schoolName: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  address: string;
}

class ProjectDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createAt: string;

  @ApiProperty()
  updateAt: string;

  @ApiProperty()
  gitHubLink: string;

  @ApiProperty()
  gitHubNameLink: string;

  @ApiProperty()
  documentationLink: string;

  @ApiProperty()
  projectLink: string;

  @ApiProperty()
  projectNameLink: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  description_ua: string;

  @ApiProperty()
  technologies: string;
}

export class UserDataResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  avatarURL: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  firstName_ua: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  lastName_ua: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  aboutMe: string;

  @ApiProperty()
  aboutMe_ua: string;

  @ApiProperty()
  englishLevel: string;

  @ApiProperty()
  ukraineLangue: string;

  @ApiProperty()
  russianLangue: string;

  @ApiProperty()
  sample: string;

  @ApiProperty()
  colorSchema: string;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  siteResume: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  public userAgreement: boolean;

  @ApiProperty({ type: [ContactDataDto] })
  contacts: ContactDataDto[];

  @ApiProperty({ type: [WorkDataDto] })
  works: WorkDataDto[];

  @ApiProperty({ type: [EducationDataDto] })
  educations: EducationDataDto[];

  @ApiProperty({ type: [ProjectDataDto] })
  projects: ProjectDataDto[];
}
