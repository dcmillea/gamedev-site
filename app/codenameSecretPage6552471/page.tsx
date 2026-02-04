import ArchiveFragments from "./ArchiveFragments";
import PuzzleShell from "./puzzle-shell";

export default function SecretPage() {
  return (
  <>
    <PuzzleShell />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ArchiveFragments />
    </div>
  </>);
}
