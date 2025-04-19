import { CoursePart } from "./types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
  let information;

  switch (part.kind) {
    case "basic":
      information = (
        <div>
          {part.description}
        </div>
      );
      break;
    case "background":
      information = (
        <div>
          <div>
            {part.description}
          </div>
          <div>
            submit to {part.backgroundMaterial}
          </div>
        </div>
      );
      break;
    case "group":
      information = (
        <div>
          project exercises {part.groupProjectCount}
        </div>
      );
      break;
    case "special":
      information = (
        <div>
          <div>
            {part.description}
          </div>
          <div>
            required skills: {part.requirements.join(", ")}
          </div>
        </div>
      );
      break;
    default:
      assertNever(part);
  }

  return (
    <div>
      <h3 style={{marginBottom: 0}}>{part.name} {part.exerciseCount}</h3>
      {information}
    </div>
  );
};

export default Part;