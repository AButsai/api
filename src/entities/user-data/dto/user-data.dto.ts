import { ApiProperty } from '@nestjs/swagger';

class ContactDataDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public link: string;

  @ApiProperty()
  public svg: string;
}

class WorkDataDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public createAt: string;

  @ApiProperty()
  public updateAt: string;

  @ApiProperty()
  public position: string;

  @ApiProperty()
  public companyName: string;

  @ApiProperty()
  public startDate: string;

  @ApiProperty()
  public endDate: string;

  @ApiProperty()
  public descriptionWork: string;

  @ApiProperty()
  public descriptionWork_ua: string;

  @ApiProperty()
  public technologies: string;
}

class EducationDataDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public createAt: string;

  @ApiProperty()
  public updateAt: string;

  @ApiProperty()
  public position: string;

  @ApiProperty()
  public schoolName: string;

  @ApiProperty()
  public startDate: string;

  @ApiProperty()
  public endDate: string;

  @ApiProperty()
  public address: string;
}

class ProjectDataDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public createAt: string;

  @ApiProperty()
  public updateAt: string;

  @ApiProperty()
  public gitHubLink: string;

  @ApiProperty()
  public gitHubNameLink: string;

  @ApiProperty()
  public documentationLink: string;

  @ApiProperty()
  public projectLink: string;

  @ApiProperty()
  public projectNameLink: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public description_ua: string;

  @ApiProperty()
  public technologies: string;
}

export class UserDataResponseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public avatarURL: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public firstName_ua: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty()
  public lastName_ua: string;

  @ApiProperty()
  public position: string;

  @ApiProperty()
  public aboutMe: string;

  @ApiProperty()
  public aboutMe_ua: string;

  @ApiProperty()
  public sample: string;

  @ApiProperty()
  public colorSchema: string;

  @ApiProperty()
  public verified: boolean;

  @ApiProperty()
  public siteResume: string;

  @ApiProperty()
  public resume: string;

  @ApiProperty()
  public userAgreement: boolean;

  @ApiProperty({ type: [ContactDataDto] })
  public contacts: ContactDataDto[];

  @ApiProperty({ type: [ContactDataDto] })
  public social: ContactDataDto[];

  @ApiProperty({ type: [WorkDataDto] })
  public works: WorkDataDto[];

  @ApiProperty({ type: [EducationDataDto] })
  public educations: EducationDataDto[];

  @ApiProperty({ type: [ProjectDataDto] })
  public projects: ProjectDataDto[];
}
