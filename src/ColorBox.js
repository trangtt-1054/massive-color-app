import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";
import classNames from "classnames";

const ColorBox = props => {
  const [copied, setCopied] = useState[false];

  const changeCopyState = () => {
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => setCopied(false), 800);
  }, [setCopied]);

  const { name, background, paletteId, id, showFullPalette, classes } = props;
  // console.log(chroma(background).luminance()) đo độ sáng của màu để điều chỉnh màu text tương ứng

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: copied
          })} //if copied is true, add 'showOverlay' class
        />
        <div
          className={classNames(classes.copyMessage, {
            [classes.showMessage]: copied
          })}
        >
          <h1>copied</h1>
          <p className={classes.copyText}>{this.props.background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showFullPalette && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={e => e.stopPropagation()}
          >
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default withStyles(styles)(ColorBox);
