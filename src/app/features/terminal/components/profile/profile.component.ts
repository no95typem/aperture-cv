import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { lastValueFrom, map, Subscription } from 'rxjs';
import { Profile } from 'src/assets/data/profiles/_profile';
import { typeLettersOneByOne } from '../../helpers/typing-effects';
import { TerminalOutput } from '../../store/terminal.unserializable';

@Component({
  selector: 'acv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy, TerminalOutput {
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

  static async iterateActivators(
    activatorFuncs: ActivatorFunc[],
    index = 0
  ): Promise<void> {
    if (index >= activatorFuncs.length) {
      return;
    }

    await activatorFuncs[index]();

    return this.iterateActivators(activatorFuncs, index + 1);
  }

  @Input() data: Profile | null = null;

  content: Partial<Profile> = {};
  headers: Partial<typeof ProfileComponent.HEADERS> = {};
  originalHeaders = ProfileComponent.HEADERS;
  isWidthBiggerThan1200px: boolean = true;

  private subs: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const sub = this.breakpointObserver
      .observe(['(min-width: 1200px)'])
      .subscribe((state) => (this.isWidthBiggerThan1200px = state.matches));

    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

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
                this.changeDetectorRef.markForCheck();

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
    this.content = this.data ?? {};
    this.headers = ProfileComponent.HEADERS;
  }
}

type ActivatorFunc = () => Promise<void>;
