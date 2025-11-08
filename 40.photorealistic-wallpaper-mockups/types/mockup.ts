
export type RoomType = "living_room" | "bedroom" | "home_office";

export type SubjectType = 'woman' | 'man' | 'child' | 'family' | 'couple' | 'grandparents';

export interface NarrativeIntent {
  message: string;
  emotion: string;
  concept: string;
}

export interface Persona {
  identity: string;
  vibe: string;
  appearance: string;
  ethnicityVariation: string;
}

export interface HeroWall {
  role: string;
  position: string;
  constraints: string[];
}

export interface Room {
  type: string;
  locationFlavor: string;
  style: string;
  furniture: string;
  clutterLevel: string;
  heroWall: HeroWall;
}

export interface Wallpaper {
  coverage: string;
  patternScale: string;
  alignment: string;
  lightingImpact: string;
}

export interface Subject {
  activity: string;
  pose: string;
  outfit: string;
  details: string;
  expression: string;
}

export interface CameraSettings {
  angle: string;
  framing: string;
  compositionRules: string[];
  focus: string;
}

export interface LightingSettings {
  type: string;
  source: string;
  mood: string;
  timeOfDayVariations: string[];
}

export interface Effects {
  atmosphere: string[];
  prohibitions: string[];
}

export interface OutputSettings {
  style: string;
  resolution: string;
  useCase: string;
}

export interface MockupConfig {
  narrativeIntent: NarrativeIntent;
  persona: Persona;
  room: Room;
  wallpaper: Wallpaper;
  subject: Subject;
  camera: CameraSettings;
  lighting: LightingSettings;
  fx: Effects;
  output: OutputSettings;
}
