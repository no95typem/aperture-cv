import { PROFILES } from 'src/assets/data/profiles';
import { Profile } from 'src/assets/data/profiles/_profile';
import { ProfileComponent } from '../components/profile/profile.component';
import { SimpleStdoutLineComponent } from '../components/simple-stdout-line/simple-stdout-line.component';
import { TerminalStateFacade } from '../store/terminal.facade';
import { createUnserializedEntry } from '../store/terminal.unserializable';

export const routineKey = 'personnel';

export interface PersonnelRoutineArgs {
  args: string[];
  sessionId: string;
  terminalSF: TerminalStateFacade;
}

export function runPersonnelRoutine({
  sessionId,
  terminalSF,
  args,
}: PersonnelRoutineArgs) {
  try {
    switch (args[0]) {
      case '--help':
      case '-h':
      case undefined:
        help({ sessionId, terminalSF, isErr: false });
        return;
      case 'list':
        list({ sessionId, terminalSF, args: args.slice(1, args.length) });
        return;
      case 'profile':
        profile({ sessionId, terminalSF, args: args.slice(1, args.length) });
        return;
    }
  } catch {
    help({
      sessionId,
      terminalSF,
    });
  }
}

const ERR_MSG = 'Error! Wrong args!';
const HELP_MSGS = [
  'Available actions:',
  'personnel --help -h    show this message',
  'personnel list         list available persons',
  'personnel profile      show/edit/etc. a profile',
];
function help({
  sessionId,
  terminalSF,
  isErr = true,
}: Omit<PersonnelRoutineArgs, 'args'> & {
  isErr?: boolean;
}) {
  const componentType = SimpleStdoutLineComponent;

  const msgs = isErr ? [...ERR_MSG, ...HELP_MSGS] : HELP_MSGS;

  const pointers = msgs.map((msg, index) =>
    createUnserializedEntry({
      componentType,
      sessionId,
      data: msg,
      endRoutine: index === msgs.length - 1 ? routineKey : undefined,
    })
  );

  const data = pointers.map((pointer) => {
    return {
      sessionId,
      pointer,
    };
  });

  terminalSF.echoBatch(data);
}

const PROFILES_ARRAY = Object.values(PROFILES);
const APPLICANTS = PROFILES_ARRAY.filter(
  (profile) => profile.type === 'Applicant'
);
const EMPLOYEES = PROFILES_ARRAY.filter(
  (profile) => profile.type === 'Employee'
);

function list({ sessionId, terminalSF, args }: PersonnelRoutineArgs) {
  const type = args[0];

  switch (type) {
    case 'employees':
      listEmployees({ sessionId, terminalSF, args });
      return;
    case 'applicants':
      listApplicants({ sessionId, terminalSF, args });
      return;
    default:
      listHelp({
        sessionId,
        terminalSF,
        args,
        err: 'Please specify a type: applicants or employees',
      });
      return;
  }
}

const LIST_HELP_MSGS = [
  'Available actions:',
  'personnel list employees',
  'personnel list applicants',
];
function listHelp({
  sessionId,
  terminalSF,
  err,
}: PersonnelRoutineArgs & { err?: string }) {
  const LIST_MSGS = err != null ? [ERR_MSG, err] : LIST_HELP_MSGS;

  const componentType = SimpleStdoutLineComponent;

  const pointers = LIST_MSGS.map((msg, index) =>
    createUnserializedEntry({
      componentType,
      sessionId,
      data: msg,
      endRoutine: index === LIST_MSGS.length - 1 ? routineKey : undefined,
    })
  );

  const data = pointers.map((pointer) => {
    return {
      sessionId,
      pointer,
    };
  });

  terminalSF.echoBatch(data);
}

function listEmployees({ sessionId, terminalSF, args }: PersonnelRoutineArgs) {
  const LIST_MSGS = [
    'Fetching profiles...',
    `Found ${EMPLOYEES.length} employees profile`,
    EMPLOYEES.map((profile, i) => `${i}: ${profile.name} ${profile.lastname}`),
    'Please use personnel profile show to get details',
  ];

  const componentType = SimpleStdoutLineComponent;

  const pointers = LIST_MSGS.map((msg, index) =>
    createUnserializedEntry({
      componentType,
      sessionId,
      data: msg,
      endRoutine: index === LIST_MSGS.length - 1 ? routineKey : undefined,
    })
  );

  const data = pointers.map((pointer) => {
    return {
      sessionId,
      pointer,
    };
  });

  terminalSF.echoBatch(data);
}

function listApplicants({ sessionId, terminalSF, args }: PersonnelRoutineArgs) {
  const LIST_MSGS = [
    'Fetching profiles...',
    `Found ${APPLICANTS.length} applicants profile`,
    APPLICANTS.map((profile, i) => `${i}: ${profile.name} ${profile.lastname}`),
    'Please use personnel profile show to get details',
  ];

  const componentType = SimpleStdoutLineComponent;

  const pointers = LIST_MSGS.map((msg, index) =>
    createUnserializedEntry({
      componentType,
      sessionId,
      data: msg,
      endRoutine: index === LIST_MSGS.length - 1 ? routineKey : undefined,
    })
  );

  const data = pointers.map((pointer) => {
    return {
      sessionId,
      pointer,
    };
  });

  terminalSF.echoBatch(data);
}

function profile({ sessionId, terminalSF, args }: PersonnelRoutineArgs) {
  const command = args[0];

  switch (command) {
    case 'show':
      profileShow({ sessionId, terminalSF, args: args.slice(1, args.length) });
      return;
    default:
      profileDefault({ sessionId, terminalSF, args });
      return;
  }
}

function profileShow({ sessionId, terminalSF, args }: PersonnelRoutineArgs) {
  const [name, lastname] = args.slice(0, 2);

  const selectedProfile = PROFILES[
    `${name}${lastname != null ? lastname : ''}Profile` as keyof typeof PROFILES
  ] as Profile | undefined;

  if (selectedProfile == null) {
    const PROFILE_ERR_MSGS = [
      'ERROR!',
      `Profile for ${name} ${lastname != null ? lastname : ''} is not found`,
      'Please check your typing, do not forget to use Pascal Case, e.g.:',
      'personnel profile show Cave Johnson',
      'personnel profile show Maksim Kapalin',
      'personnel profile show Caroline Unknown',
    ];

    const componentType = SimpleStdoutLineComponent;

    const pointers = PROFILE_ERR_MSGS.map((msg, index) =>
      createUnserializedEntry({
        componentType,
        sessionId,
        data: msg,
        endRoutine:
          index === PROFILE_ERR_MSGS.length - 1 ? routineKey : undefined,
      })
    );

    const data = pointers.map((pointer) => {
      return {
        sessionId,
        pointer,
      };
    });

    terminalSF.echoBatch(data);

    return;
  }

  const componentType = ProfileComponent;

  const pointer = createUnserializedEntry({
    componentType,
    sessionId,
    data: selectedProfile,
    endRoutine: routineKey,
  });

  terminalSF.echo({
    sessionId,
    pointer,
  });
}

const PROFILE_DEFAULT_MSGS = [
  'The command is wrong or unknown or this functional is not implemented yet, sorry.',
  'Available commands:',
  'personnel profile show',
];
function profileDefault({ sessionId, terminalSF, args }: PersonnelRoutineArgs) {
  const componentType = SimpleStdoutLineComponent;

  const pointers = PROFILE_DEFAULT_MSGS.map((msg, index) =>
    createUnserializedEntry({
      componentType,
      sessionId,
      data: msg,
      endRoutine:
        index === PROFILE_DEFAULT_MSGS.length - 1 ? routineKey : undefined,
    })
  );

  const data = pointers.map((pointer) => {
    return {
      sessionId,
      pointer,
    };
  });

  terminalSF.echoBatch(data);
}
