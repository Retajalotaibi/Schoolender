import _ from "lodash";

export function paginate(items, pageNumder, pageSize) {
  const startIndex = (pageNumder - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
