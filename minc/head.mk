###################
### Standard Header
sp              := $(sp).x
dirstack_$(sp)  := $(d)
d               := $(dir)

ifeq ($(MAKEDEBUG),1)
	JUNK := $(info processing: $(d))
endif
