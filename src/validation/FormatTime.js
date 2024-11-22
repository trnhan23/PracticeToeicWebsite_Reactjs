export const formatTime = (seconds) => {
    const roundedSeconds = Math.round(seconds);

    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const secs = roundedSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const convertSecondsToMinutes = (seconds) => {
    const totalMinutes = seconds / 60; // Chuyển đổi giây sang phút
    return Math.round(totalMinutes);  // Làm tròn tới số phút gần nhất
};

