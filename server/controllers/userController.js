import User from "../models/userModel.js";

// Controller to get user data
export const userData = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User id is required" });
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: [
        {
          name: user.name,
          email: user.email,
          isAccountVerified: user.isAccountVerified,
        },
      ],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
