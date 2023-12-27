export interface User {
  isSelected: any;
  id: number;
  macroTitle: string;
  opcServer: string;
  selectedTags: string[];
  textareaValue: string[];
  isEditing?: boolean;
  condition: [];
  type: string;
  value: string;
  selectedConditions: [];
  isAddConditionSelected: boolean; // Add this property
  conditionType: string;
  operator: string;
  conditionValue: string;
}


