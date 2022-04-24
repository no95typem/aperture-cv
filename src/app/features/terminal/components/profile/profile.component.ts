import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Profile } from 'src/assets/data/profiles/_profile';
import { typeLettersOneByOne } from '../../helpers/typing-effects';
import { TerminalOutput } from '../../store/terminal.unserializable';

@Component({
  selector: 'acv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, TerminalOutput {
  static readonly HEADERS: Record<keyof Profile, string> = {
    name: 'Name:',
    lastname: 'Last name:',
    type: 'Type:',
    imgSrc: 'Profile picture:',
    selfDescription: 'Self Description:',
    slogan: 'Slogan:',
    education: 'Education:',
    workExperience: 'Work experience:',
    primarySkills: 'Primary skills:',
    secondarySkills: 'Secondary skills',
    languages: 'Spoken languages:',
    interests: 'Interests:',
    links: 'Links:',
    contacts: 'Contacts:',
    updatedDate: 'The last updated date:',
    systemEstimation: 'System estimation:',
  };

  @Input() data: Profile | null = null;

  content: Partial<Profile> = {};
  headers: Partial<typeof ProfileComponent.HEADERS> = {};
  originalHeaders = ProfileComponent.HEADERS;

  constructor() {}

  ngOnInit(): void {}

  async activate() {
    this.content = {};

    const activators = Object.keys(ProfileComponent.HEADERS)
      .map((key) => {
        const dataValue = this.data?.[key as keyof Profile];

        if (dataValue == null) {
          return null;
        }

        return async () => {
          this.content[key as keyof Profile] = dataValue as any;

          if (key === 'imgSrc') {
            return Promise.resolve();
          }

          await lastValueFrom(
            typeLettersOneByOne(
              ProfileComponent.HEADERS[key as keyof Profile]
            ).pipe(
              map((v) => {
                const newHeaders = {
                  ...this.headers,
                };
                newHeaders[key as keyof Profile] = v;
                this.headers = newHeaders;

                return v;
              })
            )
          );
        };
      })
      .filter((value): value is ActivatorFunc => value != null);

    return ProfileComponent.iterateActivators(activators);
  }

  activateInstantly() {
    this.content = {};
  }

  static iterateActivators(
    activatorFuncs: ActivatorFunc[],
    index = 0
  ): Promise<void> {
    const theNext = activatorFuncs[index];

    if (theNext == null) {
      return Promise.resolve();
    }

    return theNext().then(() =>
      this.iterateActivators(activatorFuncs, index + 1)
    );
  }
}

type ActivatorFunc = () => Promise<void>;
