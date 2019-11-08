import React from "react";
import { Link } from "gatsby";
import { Location } from "@reach/router";
import { LocaleContext } from "./layout";
import locales from "../../config/i18n";

const LocaleSwitcher = ({ target, ...props }) => {
  const { locale } = React.useContext(LocaleContext);

  const resolvePath = path => {
    const isIndex = path === `/`;

    if (locales[locale].default) {
      return locales[target].default
        ? `${path}`
        : `/${locales[target].path}${isIndex ? `` : `${path}`}`;
    } else {
      let pathArr = path.split("/");
      if (locales[target].default) {
        pathArr.splice(1, 1);
      } else {
        pathArr[1] = target;
      }
      return `${pathArr.join("/")}`;
    }
  };

  return (
    <Location>
      {({ location }) => {
        return <Link {...props} to={`${resolvePath(location.pathname)}`} />;
      }}
    </Location>
  );
};

export default LocaleSwitcher;
