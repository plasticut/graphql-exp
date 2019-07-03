function asyncWrapper(asyncFn) {
  return function(req, res, next) {
    const promise = asyncFn(req, res, next);
    promise.catch(e => next(e));
  };
}

const AsyncFunction = (async function() {}).constructor;

function isAsyncFunction(fn) {
  return fn instanceof AsyncFunction;
}

function promisifyCallback(proto, name) {
  const original = proto[name];

  proto[name] = function(...args) {
    const callback = args.pop();
    let callbackOverride;
    if (isAsyncFunction(callback)) {
      callbackOverride = function(next) {
        callback.call(this)
            .then(() => next())
            .catch(err => next(err));
      };
    } else {
      callbackOverride = callback;
    }
    original.call(this, ...args, callbackOverride);
  };
}

function getProjection(ast) {
  return ast.operation.selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = 1;

    return projections;
  }, {});
}

function getOrderBy(orderBy) {
  if (!Array.isArray(orderBy)) {
    orderBy = [orderBy];
  }
  return orderBy.reduce((acc, {field, direction}) => ({
    ...acc,
    [field]: direction.value
  }), {});
}

function applySort(query, orderBy) {
  if (orderBy) {
    query.sort(getOrderBy(orderBy));
  }
  return query;
}

module.exports = {
  asyncWrapper,
  isAsyncFunction,
  promisifyCallback,

  getOrderBy,
  getProjection,

  applySort
};
