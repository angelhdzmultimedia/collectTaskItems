const ElementType = {
  Select_item: 'Select_item',
  Container: 'Container',
};

class SceneObject {
  public identity: {
    elementType: string;
    id: string;
    subtype: string;
  } = { id: '', elementType: 'Container', subtype: '' };
  public behavior = {
    isTarget: false,
    state: '',
    children: [],
  };
}

class SelectSettings {
  public singleSelect: boolean = false;
  public autoSelectPredecessors: boolean = false;
}

class SelectItemVO {
  constructor(...args: any[]) {}
}

class ContainerVO {
  constructor(...args: any[]) {}
}

type State = {
  current: (ContainerVO | SelectItemVO)[];
};

class SelectStageVO {
  public singleSelect: boolean = false;
  public autoSelectPredecessors: boolean = false;
  public items: (ContainerVO | SelectItemVO)[] = [];
  public state: State = {
    current: [],
  };
}

function collectTaskItems(
  stageVO: SelectStageVO,
  items: SceneObject[],
  settings: ImageDataSettings,
  stageIndex: number,
  stageItemCount = 0
): void {
  if (!items || items.length <= 0) return;
  const selectSettings = settings as SelectSettings;

  for (const item of items) {
    switch (item.identity.elementType) {
      case ElementType.Container:
        const itemId = item.identity.id;
        if (item.behavior?.children && item.behavior.children.length > 0) {
          const containerVO = new ContainerVO();
          collectTaskItems(
            stageVO,
            item.behavior.children,
            settings,
            stageIndex,
            stageItemCount
          );
          stageVO.state.current.push(containerVO);
        }
        break;

      case ElementType.Select_item:
        const selectItemVO = new SelectItemVO(
          item.identity.id,
          item.identity.elementType,
          item.identity.subtype,
          undefined,
          (() => {})(),
          item.behavior?.isTarget,
          item.behavior?.state
        );
        stageVO.items.push(selectItemVO);
        stageVO.singleSelect = selectSettings.singleSelect;
        stageVO.autoSelectPredecessors = selectSettings.autoSelectPredecessors;
        break;

      default:
        break;
    }
  }
}
