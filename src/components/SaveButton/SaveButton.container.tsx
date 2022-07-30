import { nanoid } from 'nanoid';
import React from 'react';

import SaveButton from './SaveButton.presenter';
import { ISaveButton } from './SaveButton.entity';

import { client } from 'api/client';
import { useStore } from 'store';
import { EModal } from 'store/store.entity';
import { observer } from 'mobx-react';

const SaveButtonContainer = ({ isSaved, placeId }: ISaveButton) => {
  const [mouseOver, setMouseOut] = React.useState(false);

  const {
    userStore: { user, setUser },
    modalStore: { setModal },
  } = useStore();

  const savePlace = (saveIndex: number, placeId: string) => {
    let commitRes;
    if (saveIndex === -1) {
      // not saved
      console.log(`saved ${placeId} place`);
      commitRes = client
        .patch(user._id)
        .insert('after', 'save[-1]', [
          {
            _type: 'save',
            _ref: placeId,
            _key: nanoid(),
          },
        ])
        .commit();
    } else {
      // saved
      console.log(`unsaved ${placeId} place`);
      const savedPlaceToRemove = [
        `save[${saveIndex}]`,
        `save[_ref=="${placeId}"]`,
      ];
      commitRes = client.patch(user._id).unset(savedPlaceToRemove).commit();
    }
    commitRes.then((res) => {
      const { _type, _id, userName, save } = res;
      setUser({ _type, _id, userName, save });
    });
  };

  const handleSaveClick = (id: string) => {
    if (!user._id) {
      setModal(EModal.LOGIN);
      return;
    }
    const saveIndex = user.save.findIndex((item) => item._ref === id);
    savePlace(saveIndex, id);
  };

  return (
    <SaveButton
      placeId={placeId}
      handleSaveClick={handleSaveClick}
      mouseOver={mouseOver}
      setMouseOut={setMouseOut}
      isSaved={isSaved}
    />
  );
};
export default observer(SaveButtonContainer);
