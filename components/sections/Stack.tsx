"use client";

import styles from './Stack.module.scss'

import C from "../../public/svg/c.svg";
import Cpp from "../../public/svg/cplusplus.svg";
import Python from "../../public/svg/python.svg";
import Java from "../../public/svg/java.svg";
import JS from "../../public/svg/javascript.svg";
import TS from "../../public/svg/typescript.svg";
import Haskell from "../../public/svg/haskell.svg";
import HTML from "../../public/svg/html.svg";
import CSS from "../../public/svg/css.svg";
import NextJS from "../../public/svg/nextjs.svg";
import ReactIcon from "../../public/svg/react.svg";
import Jupyter from "../../public/svg/jupyter.svg";
import Tensorflow from "../../public/svg/tensorflow.svg";
import Keras from "../../public/svg/keras.svg";
import Pytorch from "../../public/svg/pytorch.svg";
import Numpy from "../../public/svg/numpy.svg";
import Matplotlib from "../../public/svg/matplotlib.svg";
import Plotly from "../../public/svg/plotly.svg";
import Pandas from "../../public/svg/pandas.svg";
import Scikit from "../../public/svg/scikit.svg";
import Git from "../../public/svg/git.svg";
import Github from "../../public/svg/github.svg";
import Gitlab from "../../public/svg/gitlab.svg";
import Arduino from "../../public/svg/arduino.svg";
import NodeJS from "../../public/svg/nodejs.svg";
import AVR from "../../public/svg/avr.svg";
import Yarn from "../../public/svg/yarn.svg";
import Postgres from "../../public/svg/postgresql.svg";
import Prisma from "../../public/svg/prisma.svg";
import Mysql from "../../public/svg/mysql.svg";
import OpenCV from "../../public/svg/opencv.svg";
import Rpi from "../../public/svg/rpi.svg";
import Anaconda from "../../public/svg/anaconda.svg";
import CMake from "../../public/svg/cmake.svg";
import Nvidia from "../../public/svg/nvidia.svg";
import { motion, useCycle, type Variants } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roboto_mono, montserrat, comfortaa } from '../../lib/fonts';
interface SubstackProps {
    name: string;
    children: React.ReactNode;
  }
const Skill:React.FC<SubstackProps> = ({name, children}) => {
    const varients: Variants = {
        open: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                x: { stiffness: 1000, velocity: -100 }
              }
        },
        closed: {
            opacity: 0,
            scale: 0,
            y: "-200%",
            transition: {
                x: { stiffness: 1000}
              }
        }
    }

    return (
        <motion.div variants={varients} className={styles.skill__wrapper}>
            <div className={styles.skill__icon}>{children}</div>
            <p className={styles.skill__name}>{name}</p>
        </motion.div>
    );
}

const SubStack:React.FC<SubstackProps> = ({name, children}) => {

    const varients: Variants = {
        open:{
            height: "min-content",
            margin: "1em 0em",
            scale: 1,
            transition: {
                type: "spring",
                restDelta: 1,
                delayChildren: 0.2,
                staggerChildren: 0.1,
            }
        },
        closed: {
            height: 0,
            margin: 0,
            scale: 0,
        }
      };

    const [isOpen, toggleOpen] = useCycle(false, true);

    return (
        <motion.div
        layout
        initial={false}
        // whileHover={{scale: 1.03}}
        onClick={()=>toggleOpen()}
        animate={isOpen ? "open" : "closed"}
        className={styles.substack}>
            <motion.div layout className={`${styles.substack__header} ${montserrat.className}`}
            >
                <h4 className={styles.substack__title}>{name}</h4>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className={styles.substack__icon}/>
            </motion.div>
            <motion.div variants={varients} className={styles.substack__container}>
                {children}
            </motion.div>
        </motion.div>
    );
  }

const Stack = () => {
    const categories = [
        {
            name: "Core Languages",
            style: {
                background: "linear-gradient(45deg, var(--color-red) 0%, rgba(255,255,255,255) 100%)"
            },
            stack:[
                {
                    name: "C",
                    icon: <C/>
                },
                {
                    name: "C++",
                    icon: <Cpp/>
                },
                {
                    name: "Python",
                    icon: <Python/>
                },
                {
                    name: "Java",
                    icon: <Java/>
                },
                {
                    name: "JS",
                    icon: <JS/>
                },
                {
                    name: "TS",
                    icon: <TS/>
                },
                {
                    name: "Haskell",
                    icon: <Haskell/>
                },
                {
                    name: "HTML",
                    icon: <HTML/>
                },
                {
                    name: "CSS",
                    icon: <CSS/>
                }
            ]
        },
        {
            name: "Data Science",
            style: {
                background: "linear-gradient(45deg, var(--color-blue) 0%, rgba(255,255,255,255) 100%)"
            },
            stack:[{
                name: "Tensorflow",
                icon: <Tensorflow/>
            },
            {
                name: "Keras",
                icon: <Keras/>
            },
            {
                name: "Pytorch",
                icon: <Pytorch/>
            },
            {
                name: "Numpy",
                icon: <Numpy/>
            },
            {
                name: "Matplotlib",
                icon: <Matplotlib/>
            },
            {
                name: "Plotly",
                icon: <Plotly/>
            },
            {
                name: "Pandas",
                icon: <Pandas/>
            },
            {
                name: "Scikit",
                icon: <Scikit/>
            },
            {
                name: "Jupyter",
                icon: <Jupyter/>
            }]
        },
        {
            name: "Computing",
            style: {
                background: "linear-gradient(45deg, var(--color-orange) 0%, rgba(255,255,255,255) 100%)"
            },
            stack:[{
                name: "OpenCV",
                icon: <OpenCV/>
            },
            {
                name: "CUDA",
                icon: <Nvidia/>
            },
            {
                name: "Anaconda",
                icon: <Anaconda/>
            },
            {
                name: "CMake",
                icon: <CMake/>
            }]

        },
        {
            name: "Web Development",
            style: {
                background: "linear-gradient(45deg, var(--color-yellow) 0%, rgba(255,255,255,255) 100%)"
            },
            stack:[{
                name: "NextJS",
                icon: <NextJS/>
            },
            {
                name: "React",
                icon: <ReactIcon/>
            },
            {
                name: "NodeJS",
                icon: <NodeJS/>
            },
            {
                name: "Yarn",
                icon: <Yarn/>
            }]
        },

        {
            name: "Embedded System",
            style: {
                background: "linear-gradient(45deg, var(--color-purple) 0%, rgba(255,255,255,255) 100%)"
            },
            stack:[{
                name: "Arduino",
                icon: <Arduino/>
            },
            {
                name: "AVR",
                icon: <AVR/>
            },
            {
                name: "RaspberryPi",
                icon: <Rpi/>
            }]
        },
        {
            name: "Database",
            style: {
                background: "linear-gradient(45deg, var(--color-green) 0%, rgba(255,255,255,255) 100%)"
            },
            stack:[{
                name: "Postgres",
                icon: <Postgres/>
            },
            {
                name: "Prisma",
                icon: <Prisma/>
            },
            {
                name: "Mysql",
                icon: <Mysql/>
            }]
        },
        {
            name: "Dev Ops",
            style: {
                background: "linear-gradient(45deg, var(--color-red) 0%,  rgba(255,255,255,255) 100%)"
            },
            stack:[{
                name: "Git",
                icon: <Git/>
            },
            {
                name: "Github",
                icon: <Github/>
            },
            {
                name: "Gitlab",
                icon: <Gitlab/>
            }
            ]
        },

    ]

    return (
        <main className={styles.main}>
            <h1 className={comfortaa.className}>My Stack</h1>
            <motion.div layout className={styles.stack}>
                {
                    categories.map((category) => (
                        <div className={styles.stack_2} key={category.name}>
                            <SubStack name={category.name}>
                                {
                                    category.stack.map((skill) => (
                                        <div key={skill.name}>
                                            <Skill name={skill.name}>
                                                {skill.icon}
                                            </Skill>
                                        </div>
                                    ))
                                }
                            </SubStack>
                        </div>
                    ))
                }
            </motion.div>
        </main>
    );
    }

export default Stack;
