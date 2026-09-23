"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { FC, ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

const CONTAINER_SIZE = 200;

interface FamilyButtonProps {
  children: React.ReactNode;
}

const FamilyButton: React.FC<FamilyButtonProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={cn(
        "rounded-[24px] border border-black/10 shadow-sm dark:border-yellow-400/20",
        "bg-gradient-to-b from-neutral-900 to-black",
        isExpanded
          ? "w-[204px] bg-gradient-to-b dark:from-stone-900 dark:to-neutral-900/80"
          : "bg-gradient-to-b dark:from-neutral-900 dark:to-stone-950"
      )}
    >
      <div className="rounded-[23px] border border-black/10">
        <div className="rounded-[22px] border border-white/50 dark:border-stone-800">
          <div className="flex items-center justify-center rounded-[21px] border border-neutral-950/20">
            <FamilyButtonContainer
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
            >
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                >
                  {children}
                </motion.div>
              ) : null}
            </FamilyButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// A container that wraps content and handles animations
interface FamilyButtonContainerProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  children: ReactNode;
}

const FamilyButtonContainer: FC<FamilyButtonContainerProps> = ({
  isExpanded,
  toggleExpand,
  children,
}) => {
  return (
    <motion.div
      className={cn(
        "relative z-10 flex cursor-pointer flex-col items-center space-y-1 border border-white/10 text-white shadow-lg",
        !isExpanded
          ? "bg-gradient-to-b from-neutral-900 to-stone-900 dark:from-stone-700 dark:to-neutral-800/80"
          : ""
      )}
      layoutRoot
      layout
      initial={{ borderRadius: 21, width: "4rem", height: "4rem" }}
      animate={
        isExpanded
          ? {
              borderRadius: 20,
              width: CONTAINER_SIZE,
              height: CONTAINER_SIZE + 50,

              transition: {
                type: "spring",
                damping: 25,
                stiffness: 400,
                when: "beforeChildren",
              },
            }
          : {
              borderRadius: 21,
              width: "4rem",
              height: "4rem",
            }
      }
    >
      {children}

      <motion.div
        className="absolute"
        initial={{ x: "-50%" }}
        animate={{
          x: isExpanded ? "0%" : "-50%",
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        style={{
          left: isExpanded ? "" : "50%",
          bottom: 6,
        }}
      >
        {isExpanded ? (
          <motion.div
            className="group rounded-full border border-cyan-100/30 bg-neutral-800/50 p-[10px] text-orange-50 shadow-2xl transition-colors duration-300 hover:border-neutral-200 dark:bg-black/50"
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={false}
            animate={{
              rotate: -360,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <XIcon
              className={cn(
                "h-7 w-7 text-cyan-100/30 transition-colors duration-200 group-hover:text-neutral-500 dark:text-neutral-400/80"
              )}
            />
          </motion.div>
        ) : (
          <motion.div
            className={cn(
              "group border border-cyan-100/10 bg-neutral-200 p-[10px] text-cyan-50 shadow-2xl transition-colors duration-200 dark:bg-cyan-500/90"
            )}
            style={{ borderRadius: 24 }}
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={{ rotate: 180 }}
            animate={{
              rotate: -180,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <PlusIcon className="h-7 w-7 text-black dark:text-neutral-900" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export { FamilyButton };
export default FamilyButton;
