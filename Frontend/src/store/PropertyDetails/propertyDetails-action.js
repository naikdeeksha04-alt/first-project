import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

// fetch details of one specific property using its id

// recv property id
// start loading
// call backend api
// wait for response
// get the property data
// store details in redux
// If error store error in redux

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());

    const response = await axiosInstance.get(
      `/v1/rent/listing/${id}`
    );

    console.log("Property Details Response:", response);

    if (!response) {
      throw new Error("Could not fetch any propertyDetails");
    }

    const { data } = response;

    // Store only the actual property details
    dispatch(
      propertyDetailsAction.getPropertyDetails(data.data)
    );

  } catch (error) {
    console.error("Property Details Error:", error);

    dispatch(
      propertyDetailsAction.getErrors(
        error.response?.data?.message || error.message
      )
    );
  }
};