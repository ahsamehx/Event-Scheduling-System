import bcrypt from 'bcryptjs';
import User from '../models/user.js';


function filterObject(obj, allowedFields) {
  const filtered = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) filtered[key] = obj[key];
  });
  return filtered;
}



export const getUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};


export const getUser = async (req, res, next) => {
  try {
    const user = await User.findUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    delete user.password; 
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};



export const updateUserDetails = async (req, res, next) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const userId = req.params.id ? Number(req.params.id) : req.user?.userId;

    if (!isAdmin && req.params.id && userId !== Number(req.params.id)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const allowedFields = isAdmin ? ['name', 'email', 'role'] : ['name', 'email'];
    const filteredBody = filterObject(req.body, allowedFields);

    if (!Object.keys(filteredBody).length) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    const updatedUser = await User.updateUser(userId, filteredBody);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};



export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteUser(Number(req.params.id));
    res.status(200).json({ success: true, data: user });
  } catch (error) {
      next(error);
  }
};



export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id ? Number(req.params.id) : req.user.userId;

    const user = await User.findUserById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateUser(userId, { password: hashedPassword });

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};



export const changeRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const userId = Number(req.params.id);

    const updatedUser = await User.updateUser(userId, { role });
    res.status(200).json({ success: true, message: 'Role updated successfully', data: updatedUser });
  } catch (error) {
    next(error);
  }
};