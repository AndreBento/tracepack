import { Request, Response} from 'express';

import { getRepository } from 'typeorm';
import localizationView from '../views/localizationView';
import Localization from '../models/Localization';
import * as Yup from 'yup';

export default {
  async index(request: Request, response: Response) {
    const locationsRepository = getRepository(Localization);
    const locations = await locationsRepository.find();
    return response.json(localizationView.renderMany(locations));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const localizationRepository = getRepository(Localization);
    const localization = await localizationRepository.findOneOrFail(id);
    return response.json(localizationView.render(localization));
  },

  async create(request: Request, response: Response) {
    const { name, latitude, longitude, about } = request.body;

  const localizationRepository = getRepository(Localization);

  const data = {
    name,
    latitude,
    longitude,
    about,
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(300),
  });

  await schema.validate(data, {
    abortEarly: false,
  });

  const localization = localizationRepository.create(data);

  await localizationRepository.save(localization);

  return response.status(201).json(localization);
  }

 
}