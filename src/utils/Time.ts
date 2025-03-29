
// Превращает количество секунд 6.16035607 в "00:06:160"
export function formatSecondsToMMSSsss(seconds: number): string {
  const totalMilliseconds = Math.round(seconds * 1000);
  const minutes = Math.floor(totalMilliseconds / 60_000);
  const remainingMilliseconds = totalMilliseconds % 60_000;
  const secs = Math.floor(remainingMilliseconds / 1000);
  const ms = remainingMilliseconds % 1000;
  
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = secs.toString().padStart(2, '0');
  const formattedMilliseconds = ms.toString().padStart(3, '0');
  
  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}