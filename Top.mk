.DELETE_ON_ERROR:

###############################
## Make Includes -- needed only
## for the top level Rules.mk
MINC := $(abspath $(dir)/minc)

include $(MINC)/head.mk
#######################

#################
## Version Number
VERSION := 1.5.1

##################
## Build Directory
BUILD_DIR     := $(d)/dp.SyntaxHighlighter
BUILD_MIN_DIR := $(BUILD_DIR)/Minimized
BUILD_MAX_DIR := $(BUILD_DIR)/Unminimized
BD_STAMP      := $(BUILD_DIR)/.stamp

##############
## Programs
JSLINT       := $(d)/bin/jslint
YC           := $(d)/bin/yuicompressor

########
## Flags
YC_CSS_FLAGS    := --charset utf-8 --type css --line-break 72
YC_JS_FLAGS     := --charset utf-8 --type js  --preserve-semi

############
## Verbosity
ifeq ($(VERBOSE),1)
	Q =
else
	Q = @
endif

################
## Top Variables
LINT         :=
TARGETS      :=
CLEAN        := $(BUILD_DIR)

#################
## Default target
.PHONY: all
all: build

##########
## Subdirs
dir     := $(d)
include $(dir)/Rules.mk
dir     := $(d)/Scripts
include $(dir)/Rules.mk
dir     := $(d)/Styles
include $(dir)/Rules.mk

################
## Build Targets
build: $(TARGETS)
.PHONY: build

$(BD_STAMP):
	mkdir -p $(BUILD_DIR) $(BUILD_MAX_DIR) $(BUILD_MIN_DIR)
	touch $@

#######################
## Makefile Debug Rules
makedebug:
	$(info TARGETS: $(TARGETS))
	$(info CLEAN:   $(CLEAN))
	$(info LINT:    $(LINT))
.PHONY: makefiledebug

#############
## Lint Rules
lint: $(LINT)
.PHONY: lint

showlint: lint
	$(Q)find $(d) -name '*.lint' -print0 | xargs --no-run-if-empty -0 cat
.PHONY: showlint

########
## Clean
clean:
	$(info Cleaning up ...)
	$(Q)rm -rf $(CLEAN)
.PHONY: clean

#######################
include $(MINC)/foot.mk
