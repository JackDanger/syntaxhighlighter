include $(MINC)/head.mk
#######################

SOURCE_$(d)    := $(wildcard $(d)/*.js $(d)/*.swf)
TARGETS_$(d) := \
  $(patsubst $(d)/%, $(BUILD_MAX_DIR)/%, $(SOURCE_$(d))) \
  $(patsubst $(d)/%, $(BUILD_MIN_DIR)/%, $(SOURCE_$(d)))
LINT_$(d)    := $(patsubst $(d)/%.js, $(d)/%.js.lint, $(filter %.js, $(SOURCE_$(d))))

########
## Rules
$(LINT_$(d)): $(d)/%.js.lint: $(d)/%.js $(d)/Rules.mk $(BD_STAMP)
	$(info Linting $(notdir $@) ...)
	$(Q)$(JSLINT) -p $(filter %.js,$<) > $@ || :
	$(Q)egrep -Hin 'console\.log|narf' $(filter %.js,$^) >> $@ || :
	$(Q)($(YC) $(YC_JS_FLAGS) --warn -o /dev/null $(filter %.js,$<) \
   		2>&1 | egrep -v '\[WARNING\] \[WARNING\] Found an undeclared symbol: dp|dp ---> \. <--- sh.Brushes.[^=]+=function \(\)' >> $@) || :

$(filter $(BUILD_MAX_DIR)/%.js, $(TARGETS_$(d))): $(BUILD_MAX_DIR)/%.js: $(d)/%.js
	$(info Copying $(notdir $(filter %.js,$^)) ...)
	$(Q)cp $(filter %.js,$^) $@

$(filter $(BUILD_MIN_DIR)/%.js, $(TARGETS_$(d))): $(BUILD_MIN_DIR)/%.js: $(d)/%.js
	$(info Minimizing $(notdir $(filter %.js,$^)) ...)
	$(Q)$(YC) $(YC_JS_FLAGS) -o $@ $(filter %.js,$^)

$(BUILD_MIN_DIR)/%.swf $(BUILD_MAX_DIR)/%.swf: $(d)/%.swf
	$(info Copying $(notdir $(filter %.swf,$^)) ...)
	$(Q)cp $(filter %.swf,$^) $@

#####################
## Extra Dependancies
$(TARGETS_$(d)): $(d)/Rules.mk $(BD_STAMP)
$(LINT_$(d)): $(d)/Rules.mk

###############
## Save Changes
TARGETS := $(TARGETS) $(TARGETS_$(d))
LINT    := $(LINT) $(LINT_$(d))
CLEAN   := $(CLEAN) $(TARGETS_$(d)) $(LINT_$(d))

#######################
include $(MINC)/foot.mk
