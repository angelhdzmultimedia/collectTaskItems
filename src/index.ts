const ElementType =  {
    Select_item: 'Select_item',
    Container: 'Container'
}



class SceneObject {
  public identity: {
    elementType:  string,
    id: string,
    subtype: string
  } = {id: '', elementType: "Container", subtype: ''}
  public behavior = {
    children: []
  }
}

class SelectSettings {

}

class SelectItemVO {
  constructor(...args: any[]) {

  }
}

class ContainerVO {
  constructor(...args: any[]) {

  }
}

class SelectStageVO {
  public items: (ContainerVO | SelectItemVO)[] = []
}

function collectTaskItems( 
  stageVO: SelectStageVO, 
  items: SceneObject[], settings: ImageDataSettings, 
  stageIndex: number, stageItemCount = 0): void {
   if (!items || items.length <= 0) return;  
  const selectSettings = settings as SelectSettings;

  for (const item of items) { 
    switch (item.identity.elementType) {
      case ElementType.Container: 
        const itemId = item.identity.id; 
        if (item.behavior?.children && item.behavior.children.length > 0) {

        }
        break; 
      
        case ElementType.Select_item: 
        const itemVO = new SelectItemVO(

        )
        stageVO.items.push(itemVO)
        break;

        default: 
        break;
    }
  }
}