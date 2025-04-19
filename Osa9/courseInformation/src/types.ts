interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string
}

export interface CoursePartBasic extends CoursePartDescriptionBase {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: "group"
}

export interface CoursePartBackground extends CoursePartDescriptionBase {
  backgroundMaterial: string
  kind: "background"
}

export interface CoursePartRequirements extends CoursePartDescriptionBase {
  requirements: string[]
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;