import {genNameFileExport} from 'src/helpers/time-helper';
import {showError} from 'src/helpers/toast-helper';
import {addressRepository} from 'src/repositories/address-repository';
import {projectRepository} from 'src/repositories/project-repository';
import {universeRepository} from 'src/repositories/universe-repository';
import type {ProjectData} from 'src/types/data';

export async function importFile(data: ProjectData) {
  try {
    const nameProject = data.project + ` ${genNameFileExport(new Date())}`;

    const newProject = await projectRepository.create(nameProject);

    await Promise.all(
      data.universe.map(async (universe, index) => {
        const newUniverse = await universeRepository.createWithId(
          newProject,
          index + 1,
          universe.idUniverse,
        );

        for (let dataAddress of universe.data) {
          await addressRepository.create({
            order: dataAddress.STT,
            universeId: newUniverse.id,
            addressId: dataAddress.address,
            deviceType: dataAddress.typeDevice,
          });
        }
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    showError('Không thể import file dự án');
  }
}
