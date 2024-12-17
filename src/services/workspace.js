import { v4 as uuidv4 } from 'uuid';

import workSpaceRepository from '../repositories/workSpace.js';
import ValidationError from '../utils/erros/validationError.js';

export const createWorkspace = async (workspaceData) => {
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    const response = await workSpaceRepository.create({
      name: workspaceData.name,
      description: workspaceData.description,
      joinCode
    });

    await workSpaceRepository.addMemberToWorkSpace(
      response._id,
      workspaceData.owner,
      'admin'
    );

    const updatedWorkspace = await workSpaceRepository.addChannelToWorkSpace(
      response._id,
      'general'
    );

    return updatedWorkspace;
  } catch (error) {
    console.log('Error in createWorkspace Service', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message);
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A workspace with same details already exists.']
        },
        'A workspace with same details already exists.'
      );
    }
  }
};
