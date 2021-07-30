import Localization from '../models/Localization';

export default {
  render(localization: Localization) {
    return { 
      id: localization.id,
      name: localization.name,
      latitude: localization.latitude,
      longitude: localization.longitude,
      about: localization.about,
    };
  }, 

  renderMany(locations: Localization[]){
    return locations.map(localization => this.render(localization));
  }
}