export const statusRating = {
    Hight: 2,
    Medium: 1,
    Low: 0
};

export const stateRating = {
    Good: "Tuyệt vời",
    Normal: "Thú vị",
    NoGood: "Không được đánh giá cao"
}

export const calRankRating = (points: number[]): number => {
    if (!points)
        return statusRating.Low;

    const totalRatingPoint = points.reduce((total, point) => total + point, 0);
    const mediumScore = totalRatingPoint / points.length;

    if (mediumScore > 7.5)
        return statusRating.Hight;

    if (mediumScore > 6.5)
        return statusRating.Medium;

    return statusRating.Low;
}

export const checkStateRating = (point: number): string => {
    if (!point)
        return stateRating.NoGood;

    if (point == statusRating.Hight)
        return stateRating.Good;

        if (point == statusRating.Medium)
        return stateRating.Normal;

    return stateRating.NoGood;
}