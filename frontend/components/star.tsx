import { FaStar } from "react-icons/fa";

export const fetchStar = (rating: number) => {
    return (
      <div className="flex flex-row">
        {Array(5)
          .fill(null)
          .map((_, index) => {
            const starColor = index < rating ? "#ffc107" : "#102133";
            return (
              <label key={rating}>
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  style={{ display: "none" }}
                />
                <FaStar
                  className="cursor-pointer"
                  size={25}
                  color={starColor}
                />
              </label>
            );
          })}
      </div>
    );
  };