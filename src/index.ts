const ElementType =  {
    Select_item: 'Select_item',
    Container: 'Container'
}

class SelectStageVO {

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
        if (item.behavior?.children && item.behavior.children. length > 0) {

        }
        break; 
      
        case ElementType.Select_item: 

        break;

        default: 
        break;
    }
  }
}