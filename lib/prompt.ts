
import type { MockupConfig, RoomType, SubjectType, Persona, Subject } from '../types/mockup';

const roomDetailsMap = {
  living_room: {
    type: "LIVING ROOM",
    furniture: "Comfortable sofa, simple coffee table, floor lamp, rug, maybe some books or plants.",
    heroWallPosition: "Wall behind the sofa.",
    subjectActivity: "Relaxed everyday moment: reading on the sofa, scrolling on phone, sipping coffee.",
  },
  bedroom: {
    type: "BEDROOM",
    furniture: "Cozy bed with simple headboard, nightstand, soft rug, maybe a small armchair.",
    heroWallPosition: "Wall behind the bed headboard.",
    subjectActivity: "Waking up, stretching, reading a book in bed, or getting ready.",
  },
  home_office: {
    type: "HOME OFFICE",
    furniture: "Minimalist desk, comfortable chair, bookshelf, maybe a small plant.",
    heroWallPosition: "Main wall behind the desk.",
    subjectActivity: "Working on a laptop, sketching in a notebook, or on a video call.",
  }
};

const subjectDetailsMap: Record<SubjectType, { persona: Partial<Persona>; subject: Partial<Subject>; }> = {
    woman: {
        persona: {
            identity: "Young American woman in her mid-20s to early-30s living in California",
            vibe: "Creative, internet-savvy, casual but stylish, middle-class urban lifestyle",
            appearance: "Natural makeup or no-makeup look, healthy skin tone, hair in loose waves or messy bun, realistic body proportions",
        },
        subject: {
            pose: "Natural and comfortable seated or standing pose, not sexualized or over-posed",
            outfit: "Casual California style: soft knit sweater, t-shirt and jeans, comfy loungewear, cotton dress, or athleisure set",
            expression: "Soft smile, focused, relaxed, or slightly dreamy — feels like a candid moment at home",
        }
    },
    man: {
        persona: {
            identity: "Young American man in his mid-20s to early-30s living in California",
            vibe: "Creative, tech-savvy, relaxed and casual, middle-class urban lifestyle",
            appearance: "Natural, healthy appearance, short or medium-length hair, realistic body proportions",
        },
        subject: {
            pose: "Natural, relaxed pose, such as leaning against a wall, sitting on the sofa, or at a desk",
            outfit: "Casual California style: t-shirt and jeans, henley shirt, comfortable sweater, or hoodie",
            expression: "Thoughtful, relaxed, or a gentle smile",
        }
    },
    child: {
        persona: {
            identity: "A young child, boy or girl, aged 5-8",
            vibe: "Playful, imaginative, happy, and engrossed in an activity",
            appearance: "A natural, candid appearance suitable for a child",
        },
        subject: {
            activity: "Playing with wooden toys on the rug, drawing at a small table, reading a picture book.",
            pose: "Natural childhood poses: sitting on the floor, kneeling, or sitting in a small chair",
            outfit: "Comfortable and simple play clothes (e.g., t-shirt and leggings, simple dress, shorts)",
            expression: "Focused, happy, or curious",
        }
    },
    couple: {
        persona: {
            identity: "A young couple, man and woman, in their late 20s to early 30s",
            vibe: "Affectionate, relaxed, happy together, sharing a quiet moment",
            appearance: "Natural, healthy appearance, reflecting a casual California lifestyle",
        },
        subject: {
            activity: "Chatting on the sofa with coffee, looking at a laptop together, reading side-by-side, a quiet shared moment.",
            pose: "Comfortable and close, but natural. Sitting together on a sofa or standing near each other",
            outfit: "Coordinated casual loungewear or comfortable home attire",
            expression: "Happy, content, and relaxed expressions",
        }
    },
    family: {
        persona: {
            identity: "A young family, parents in their 30s with one young child (4-7 years old)",
            vibe: "Warm, loving, candid family moment, not overly posed",
            appearance: "Natural and relatable appearance for a young family",
        },
        subject: {
            activity: "Reading a book together on the sofa, playing a board game on the floor, parents watching the child play.",
            pose: "Grouped together in a natural, interactive way, like sitting on a rug or sofa",
            outfit: "Casual, comfortable home clothes that are complementary but not matching",
            expression: "Joyful, loving, and engaged with each other",
        }
    },
    grandparents: {
        persona: {
            identity: "An older couple in their late 60s or 70s",
            vibe: "Content, peaceful, loving, enjoying their retirement",
            appearance: "Kind faces, gray or white hair, reflecting a healthy and active older age",
        },
        subject: {
            activity: "One is reading a newspaper while the other knits, doing a puzzle together, enjoying tea and looking out a window.",
            pose: "Comfortably seated in armchairs or on a sofa, engaged in their individual or shared activities",
            outfit: "Comfortable, classic clothing such as cardigans, slacks, and comfortable shirts",
            expression: "Peaceful, content, and serene expressions",
        }
    },
};

export function getBaseCaliforniaMockupConfig(roomType: RoomType, subjectType: SubjectType): MockupConfig {
  const roomDetails = roomDetailsMap[roomType];
  const { persona: personaDetails, subject: subjectDetails } = subjectDetailsMap[subjectType];

  const baseConfig: MockupConfig = {
    narrativeIntent: {
      message: "Real-life California apartment with a relaxed subject and hero wallpaper wall",
      emotion: "Cozy, lived-in, effortless West Coast comfort",
      concept: "Everyday California moment unwinding in a stylish rental apartment, with the wallpaper wall as the subtle design hero",
    },
    persona: {
      identity: "Young American woman in her mid-20s to early-30s living in California",
      vibe: "Creative, internet-savvy, casual but stylish, middle-class urban lifestyle",
      appearance: "Natural makeup or no-makeup look, healthy skin tone, hair in loose waves or messy bun, realistic body proportions",
      ethnicityVariation: "Rotate between diverse, realistic American backgrounds (White, Latina, Black, Asian, mixed) across different generations of mockups",
    },
    room: {
      type: roomDetails.type,
      locationFlavor: "California apartment in Los Angeles or coastal city, small-to-medium size rental space",
      style: "Modern, cozy, slightly boho or minimalist, not luxury mansion",
      furniture: roomDetails.furniture,
      clutterLevel: "Lightly lived-in (mug, book, throw blanket), but not messy, keeps focus on the wallpaper wall",
      heroWall: {
        role: "Main wall where the wallpaper is applied and must be clearly visible",
        position: roomDetails.heroWallPosition,
        constraints: [
          "No large artwork, posters or shelves covering the wallpaper",
          "Subject can overlap maximum 20–30% of the wallpaper area",
          "No logos or brand names on decor",
        ],
      },
    },
    wallpaper: {
      coverage: "Full-height wallpaper covering the entire hero wall from floor or baseboard to ceiling",
      patternScale: "Pattern scale should look realistic for a standard US wall (not tiny, not oversized)",
      alignment: "Wallpaper lines and motifs must be straight and vertical, no distortion, no extreme wide-angle bending",
      lightingImpact: "Wallpaper colors must remain accurate and not washed out by lighting",
    },
    subject: {
      activity: roomDetails.subjectActivity,
      pose: "Natural and comfortable seated or standing pose, not sexualized or over-posed",
      outfit: "Casual California style: soft knit sweater, t-shirt and jeans, comfy loungewear, cotton dress, or athleisure set",
      details: "Bare feet or simple socks at home, simple jewelry, maybe a scrunchie or hair clip",
      expression: "Soft smile, focused, relaxed, or slightly dreamy — feels like a candid moment at home",
    },
    camera: {
      angle: "Room-perspective shot from human eye-level, slightly diagonal to the hero wall so we see depth but the wall remains clearly readable",
      framing: "4:5 aspect ratio",
      compositionRules: [
        "Wallpaper wall must occupy at least 40–60% of the image width",
        "Avoid extreme corner angles where wallpaper becomes too narrow",
        "Avoid fisheye or ultra-wide distortion",
      ],
      focus: "Wallpaper wall and subject both in clear, sharp focus",
    },
    lighting: {
      type: "Soft natural daylight",
      source: "Large window light coming from the side of the room (not directly behind the camera), like a California afternoon sun",
      mood: "Warm and inviting, without harsh shadows or overexposed highlights",
      timeOfDayVariations: ["Midday bright but soft light", "Late afternoon golden hour with gentle warmth"],
    },
    fx: {
      atmosphere: [
        "Slight depth of field so background stays readable",
        "No heavy film grain, no extreme color grading, keep colors realistic",
      ],
      prohibitions: [
        "No text, no brand logos, no UI overlays",
        "No surreal or fantasy elements",
        "No messy artifacts on the wallpaper area",
      ],
    },
    output: {
      style: "Photorealistic high-resolution interior photograph",
      resolution: "2048x2560 pixels",
      useCase: "Etsy product mockups for wallpaper listings showing real-life usage in a California apartment",
    },
  };

  // Merge the subject-specific details into the base config
  baseConfig.persona = { ...baseConfig.persona, ...personaDetails };
  baseConfig.subject = { ...baseConfig.subject, ...subjectDetails };
  // If a subject-specific activity is provided, use it, otherwise fallback to the room-specific one
  baseConfig.subject.activity = subjectDetails.activity || roomDetails.subjectActivity;

  return baseConfig;
}

export function buildPromptFromConfig(config: MockupConfig, wallpaperDescription: string, hasWallpaperImage: boolean): string {
  const { room, subject, lighting, camera, persona, output, fx } = config;

  const wallpaperPrompt = hasWallpaperImage
    ? "The hero wall is fully covered in a beautiful wallpaper. The precise pattern for the wallpaper is provided in the input image. Apply this pattern realistically and seamlessly to the entire hero wall, paying close attention to correct scale, texture, and lighting."
    : `The hero wall is fully covered in a beautiful wallpaper. The wallpaper is described as: **"${wallpaperDescription}"**. The pattern scale is realistic and the colors are true-to-life.`;

  const subjectPrompt = `
    **Subject:**
    The scene includes: ${persona.identity}.
    Their vibe is ${persona.vibe}.
    They have ${persona.appearance} and are dressed in ${subject.outfit}.
    Their activity is natural and relaxed: ${subject.activity}.
    Their pose is ${subject.pose} and their expression is ${subject.expression}.
    The ethnicity of the person or people should be varied if generating multiple images, reflecting a diverse American background.
  `;

  const prompt = `
    **Primary Goal:** A ${output.style} of a ${room.type} in a ${room.locationFlavor}, showcasing a feature wall with a new wallpaper. The mood is ${config.narrativeIntent.emotion}.

    **Scene Description:**
    The image captures a realistic ${room.type} with ${room.style} decor. The main focal point is the hero wall, located ${room.heroWall.position}.
    ${wallpaperPrompt}

    ${subjectPrompt}

    **Environment & Lighting:**
    The room is illuminated by ${lighting.type} from a ${lighting.source}, creating a ${lighting.mood} atmosphere.
    The space is ${room.clutterLevel}, with furniture like a ${room.furniture}.

    **Camera & Composition:**
    - **Shot Type:** ${camera.angle}.
    - **Aspect Ratio:** ${camera.framing}.
    - **Focus:** Sharp focus on both the subject(s) and the wallpaper.
    - **Rules:** The wallpaper wall must be the hero, occupying significant frame space without distortion.

    **Crucial Directives & Prohibitions:**
    - **MUST BE PHOTOREALISTIC.** Looks like a real photo from an interior design magazine.
    - **NO:** ${fx.prohibitions.join(', ')}.
    - Wallpaper must be perfectly aligned, straight, and artifact-free.
    - The subject(s) should not obscure more than 20-30% of the wallpaper.
  `;

  return prompt.replace(/\s+/g, ' ').trim();
}
