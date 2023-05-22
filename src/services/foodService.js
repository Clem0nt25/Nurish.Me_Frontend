import axios from "axios";

// Get food from API for search results
export const getFood = async (foodName, cancelToken) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/api/getFood`,
      { foodName: `${foodName} ` },
      { cancelToken }
    );

    const foods = response.data.data.map((food) => ({
      foodName: food.foodName,
      image: food.image,
      barcode: food.barcode,
    }));

    return foods;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled");
    } else {
      throw error;
    }
  }
};

// Update food details in server
export const updateFoodDetails = async (barcode, amount, mealType, userId) => {
  const currentDate = new Date().toISOString().slice(0, 10);

  await axios.post(
    `${import.meta.env.VITE_BASE_API_URL}/api/updateFoodByBarcode`,
    {
      barcode,
      currentDate,
      amount,
      mealType,
      userId,
    }
  );
};
