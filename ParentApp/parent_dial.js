export function updateDial(completedChores, totalChores) {
    const dialProgress = document.querySelector('.dial-progress');
    const dialDot = document.querySelector('.dial-dot');
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    
    const completionPercentage = (completedChores / totalChores) * 100;
    const dashArray = (completionPercentage / 100) * circumference;
    dialProgress.style.strokeDasharray = `${dashArray} ${circumference}`;

    const angle = (completionPercentage / 100) * 2 * Math.PI;
    const dotX = 60 + radius * Math.sin(angle);
    const dotY = 60 - radius * Math.cos(angle);
    dialDot.setAttribute('cx', dotX);
    dialDot.setAttribute('cy', dotY);
}