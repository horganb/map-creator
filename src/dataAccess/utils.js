export const UpdateMethods = {
  SET: '$set',
  UNSET: '$unset',
  PUSH: '$push',
  PULL: '$pull',
};

/** Given an object and a dot-separated path, return the value at the path in the object */
export const getFieldValue = (object, pathString) => {
  const pathArray = pathString.split('.');
  let val = object;
  pathArray.forEach(fieldName => {
    val = val?.[fieldName];
  });
  return val;
};

/** Given an object, a dot-separated path, and an update method, update the field at the path. */
export const updateFieldValue = (method, object, pathString, value) => {
  const pathArray = pathString.split('.');
  let val = object;
  pathArray.forEach((fieldName, index) => {
    if (index === pathArray.length - 1) {
      // at last field
      switch (method) {
        case UpdateMethods.SET:
          val[fieldName] = value;
          break;
        case UpdateMethods.UNSET:
          delete val[fieldName];
          break;
        case UpdateMethods.PUSH:
          if (!val[fieldName]) {
            val[fieldName] = [];
          }
          val[fieldName].push(value);
          break;
        case UpdateMethods.PULL:
          if (!val[fieldName]) {
            val[fieldName] = [];
          }
          val[fieldName].push(value);
          break;
        default:
          // invalid update
          break;
      }
    } else {
      if (!val[fieldName]) {
        val[fieldName] = {};
      }
      val = val[fieldName];
    }
  });
};
